class ApiResponse<T> {
    public success: boolean;
    constructor(
        public statusCode: number,
        public message: string,
        public data?: T,
    ) {
        this.success = this.statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };
