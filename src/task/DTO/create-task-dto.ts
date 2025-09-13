import { IsString, IsNotEmpty, MinLength} from "class-validator"

import { Transform } from "class-transformer"

export class CreateTaskDto {
   @Transform(({ value }) => value.trim())
   @IsString()
   @IsNotEmpty()
   @MinLength(3)
   readonly name: string

   @IsString()
   @IsNotEmpty()
   readonly description: string
}