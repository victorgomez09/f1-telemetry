import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'http://localhost:4200',
            'https://bookish-fortnight-pgqxjg5r4wj366vq-4200.app.github.dev',
        ],
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
