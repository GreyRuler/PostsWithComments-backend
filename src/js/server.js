import koaBody from 'koa-body';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
// eslint-disable-next-line import/extensions
import { generateRandomPostWithComments } from './createRandomInfo.js';

const server = new Koa();
const router = new Router();

const { posts, comments } = generateRandomPostWithComments();

server.use(cors());
// Подключаем middleware для парсинга тела запроса
server.use(koaBody({
	multipart: true,
}));

// Обработчик GET-запросов
router.get('/posts/latest', (ctx) => {
	ctx.body = {
		status: 'ok',
		data: posts.slice(0, 10),
	};
});

// Обработчик GET-запросов
router.get('/posts/:post_id/comments/latest', (ctx) => {
	ctx.body = {
		status: 'ok',
		data: comments
			.filter((comment) => comment.post_id === ctx.params.post_id)
			.slice(0, 3),
	};
});

// Подключаем роутер к приложению
server.use(router.routes());
server.use(router.allowedMethods());

// Запускаем сервер
server.listen(3000, () => {
	// eslint-disable-next-line no-console
	console.log('Server started on port 3000');
});
