// api-keyword-framework.spec.js
const { test, expect } = require('@playwright/test');

class TestDataGenerator {
    static getPostData() {
        return {
            newPost: {
                title: `Test Post ${Date.now()}`,
                body: 'This is an automated test post',
                userId: 1
            },
            updatePost: {
                title: `Updated Post ${Date.now()}`,
                body: 'This is an updated test post',
                userId: 1
            }
        };
    }

    static getUserData() {
        const timestamp = Date.now();
        return {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            username: `testuser${timestamp}`
        };
    }

    static getCommentData() {
        const timestamp = Date.now();
        return {
            name: `Test Comment ${timestamp}`,
            email: `commenter${timestamp}@example.com`,
            body: 'This is a test comment'
        };
    }
}

class RequestBuilder {
    constructor(request, baseUrl = 'https://jsonplaceholder.typicode.com') {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async getPosts() {
        return await this.request.get(`${this.baseUrl}/posts`);
    }

    async getPostById(postId) {
        return await this.request.get(`${this.baseUrl}/posts/${postId}`);
    }

    async createPost(postData) {
        return await this.request.post(`${this.baseUrl}/posts`, {
            data: postData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async updatePost(postId, postData) {
        return await this.request.put(`${this.baseUrl}/posts/${postId}`, {
            data: postData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async deletePost(postId) {
        return await this.request.delete(`${this.baseUrl}/posts/${postId}`);
    }

    async getComments(postId) {
        return await this.request.get(`${this.baseUrl}/posts/${postId}/comments`);
    }

    async createComment(postId, commentData) {
        return await this.request.post(`${this.baseUrl}/posts/${postId}/comments`, {
            data: commentData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

class APIKeywords {
    constructor(requestBuilder) {
        this.requestBuilder = requestBuilder;
    }

    async verifyResponseStatus(response, expectedStatus = 200) {
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyResponseProperty(response, property, expectedValue) {
        const responseBody = await response.json();
        expect(responseBody[property]).toBe(expectedValue);
    }

    async verifyResponseContains(response, expectedObject) {
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(expectedObject);
    }

    async verifyArrayResponse(response) {
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    }
}

// Test Suite using the keyword-driven framework
test.describe('API Test Suite using Keyword Framework', () => {
    let requestBuilder;
    let apiKeywords;
    let testData;

    test.beforeEach(async ({ request }) => {
        requestBuilder = new RequestBuilder(request);
        apiKeywords = new APIKeywords(requestBuilder);
        testData = TestDataGenerator.getPostData();
    });

    test('Complete Post CRUD Test Flow', async () => {
        // Create Post
        const createResponse = await requestBuilder.createPost(testData.newPost);
        await apiKeywords.verifyResponseStatus(createResponse, 201);
        await apiKeywords.verifyResponseContains(createResponse, testData.newPost);
        const createdPost = await createResponse.json();

        // Get Post
        const getResponse = await requestBuilder.getPostById(createdPost.id);
        await apiKeywords.verifyResponseStatus(getResponse);
        await apiKeywords.verifyResponseContains(getResponse, testData.newPost);

        // Update Post
        const updateResponse = await requestBuilder.updatePost(createdPost.id, testData.updatePost);
        await apiKeywords.verifyResponseStatus(updateResponse);
        await apiKeywords.verifyResponseContains(updateResponse, testData.updatePost);

        // Get Comments
        const commentsResponse = await requestBuilder.getComments(createdPost.id);
        await apiKeywords.verifyResponseStatus(commentsResponse);
        await apiKeywords.verifyArrayResponse(commentsResponse);

        // Add Comment
        const commentData = TestDataGenerator.getCommentData();
        const commentResponse = await requestBuilder.createComment(createdPost.id, commentData);
        await apiKeywords.verifyResponseStatus(commentResponse, 201);
        await apiKeywords.verifyResponseContains(commentResponse, commentData);

        // Delete Post
        const deleteResponse = await requestBuilder.deletePost(createdPost.id);
        await apiKeywords.verifyResponseStatus(deleteResponse);
    });

    test('Error Handling Flow', async () => {
        // Try to get non-existent post
        const getResponse = await requestBuilder.getPostById(99999);
        await apiKeywords.verifyResponseStatus(getResponse, 404);
    });

    test('Get All Posts Flow', async () => {
        const response = await requestBuilder.getPosts();
        await apiKeywords.verifyResponseStatus(response);
        await apiKeywords.verifyArrayResponse(response);
    });
});