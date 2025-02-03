import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";


@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse()

        const rpcErrror = exception.getError();
        if(typeof rpcErrror === 'object' && 'statusCode' in rpcErrror && 'message' in rpcErrror) {
            const error = rpcErrror as { statusCode: number, message: string };
            const status = isNaN(+error.statusCode) ? 400 : +error.statusCode;
            return response.status(status).json(rpcErrror);
        }

        const error = rpcErrror as { statusCode: number, message: string };

        response.status(400).json({
            statusCode: 400,
            message: error.message
        });
    }
}