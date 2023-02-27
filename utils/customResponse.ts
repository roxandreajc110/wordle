export class CustomResponse {
    private message: string;
    private data: any;

    public constructor(message: string, data?: any) {
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
} 