import { faker } from '@faker-js/faker/locale/ru';

export function createRandomPost() {
	return {
		id: faker.datatype.uuid(),
		author_id: faker.datatype.uuid(),
		title: faker.lorem.sentence(3),
		author: faker.name.fullName(),
		avatar: faker.internet.color(), // faker.image.avatar()
		image: null, // faker.image.abstract()
		created: Date.now(),
	};
}

export function createRandomComment(postId) {
	let content = '';
	for (let i = 0; i < Math.floor(Math.random() * 1000); i++) {
		content += faker.internet.emoji();
	}
	return {
		id: faker.datatype.uuid(),
		post_id: postId,
		author_id: faker.datatype.uuid(),
		author: faker.name.fullName(),
		avatar: faker.internet.color(), // faker.image.avatar()
		content,
		created: Date.now(),
	};
}

export function generateRandomPostWithComments() {
	const posts = [];
	const comments = [];
	for (let i = 0; i < 20; i++) {
		const post = createRandomPost();
		posts.push(post);
		for (let j = 0; j < 5; j++) {
			comments.push(createRandomComment(post.id));
		}
	}
	return { posts, comments };
}
