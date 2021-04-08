import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards";

export function Auth() {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
    )
}