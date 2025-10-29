import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from '../types';

// The user is expected to provide these environment variables.
const supabaseUrl = 'https://kxteagdeldhcjagtarkv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dGVhZ2RlbGRoY2phZ3Rhcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODY4ODYsImV4cCI6MjA3NzI2Mjg4Nn0.QJAOhuwXxAm1BaN-Ns_NLYuAH3gGzvg1sGR7k8UBrmE';

let supabase: SupabaseClient | null = null;
let supabaseError: string | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e: any) {
    supabaseError = `Failed to initialize Supabase: ${e.message}`;
    console.error(supabaseError);
  }
} else {
  supabaseError = 'Supabase is not configured. Authentication and progress saving are disabled.';
  const detailedError = 'Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables to enable authentication and data persistence.';
  console.warn(`${supabaseError} ${detailedError}`);
}

export { supabase, supabaseError };

/**
 * Fetches a user's profile from the database.
 * If a profile doesn't exist (e.g., for a new user), it constructs a default profile object.
 * This ensures the app has a user object to work with as soon as a session is available.
 */
export const getProfile = async (userId: string, email: string, userMetadata: any = {}): Promise<User> => {
    if (supabase) {
        const { data, error } = await supabase
            .from('profiles')
            .select('name, avatar_url, streak, points, learning_goal')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error fetching profile:', error.message);
        }

        if (data) {
            return {
                id: userId,
                email: email,
                name: data.name || userMetadata.full_name || 'Learner',
                avatarUrl: data.avatar_url || `https://picsum.photos/seed/${userId}/100/100`,
                streak: data.streak || 0,
                points: data.points || 0,
                learningGoal: data.learning_goal,
            };
        }
    }

    // Fallback for when there's no supabase client, or no profile data yet.
    return {
        id: userId,
        email: email,
        name: userMetadata.full_name || 'Learner',
        avatarUrl: `https://picsum.photos/seed/${userId}/100/100`,
        streak: 0,
        points: 0,
        learningGoal: undefined,
    };
}