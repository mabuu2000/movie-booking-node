import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import 'dotenv/config';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PRIVATE_KEY,
    );
  }

  async getAllData(table: string) {
    const { data, error } = await this.supabase.from(table).select('*');
    if (error) {
      throw error;
    }
    return data;
  }
}
