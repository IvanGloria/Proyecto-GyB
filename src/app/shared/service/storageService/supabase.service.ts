import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://bvjrsimeihtwnnydfxxl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2anJzaW1laWh0d25ueWRmeHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTgwNDQsImV4cCI6MjA0Nzk3NDA0NH0.PfDR_1p_GdTEBVnzFo2_cDri7PzkttsT9xe0gd8BEgM';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async uploadFoto(file: File): Promise<any> {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
    .from('photosUsers')
    .upload(`fotos/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Error al subir la foto: ', error.message);
      return null;
    } else {
      console.log('Foto subida con exito: ', data);
      return data;
    }
  }

  //Funcion para la URL
  async getFotoUrl(filePath: string): Promise<string | null> {
    const { data } = await this.supabase.storage
    .from('photosUsers')
    .getPublicUrl(filePath);

    if (!data) {
      console.error('Error al obtener la URL de la foto: ');
      return null;
    } else {
      return data.publicUrl;
    }
  }
}
