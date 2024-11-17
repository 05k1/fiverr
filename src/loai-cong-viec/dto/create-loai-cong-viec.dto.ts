import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLoaiCongViecDto {
    @ApiProperty()
    @IsString()
    job_category_name:string
}
