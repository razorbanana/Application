import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import type { AnySchema } from "yup";

@Injectable()
export class YupValidationPipe implements PipeTransform {
    constructor(private schema: AnySchema){}

    async transform(value: any){
        try{
            const validated = await this.schema.validate(value, {
                abortEarly: false,
                stripUnknown: true
            })

            return validated
        } catch(err) {
            throw new BadRequestException(err.errors)
        }
    }
}