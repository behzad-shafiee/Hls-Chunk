import { ApiProperty } from '@nestjs/swagger';

export class UplaodDto {
  @ApiProperty({
    description: 'enter your access_token',
    example: '1212HHRTTH^&^*^*&^4578187',
  })
  access_token: string;

}
