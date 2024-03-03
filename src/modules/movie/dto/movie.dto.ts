import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  trailer: string;

  @IsOptional()
  @IsBoolean()
  ongoing?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  rating?: number;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @IsNotEmpty()
  @IsString()
  poster: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;
}
export default CreateMovieDto;
