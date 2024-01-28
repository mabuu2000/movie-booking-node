import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private supabaseService: SupabaseService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('all-movies')
  async getAllData() {
    const data = await this.supabaseService.getAllData('movie');
    return data;
  }
}
