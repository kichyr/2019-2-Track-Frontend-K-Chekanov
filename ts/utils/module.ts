export interface translate_params {
    api_key: string,
    lang: string, // translation direction

}

const API = 'https://translate.yandex.net/api/v1.5/tr/translate';

function generate_url(text: string, params: translate_params): URL{
    var url = new URL(API);
    url.searchParams.append('api_key', params.api_key)
    url.searchParams.append('lang', params.lang)
    url.searchParams.append('text', text)
    return url;
}

// const someFunction = () => {};

export function translate(text: string, params: translate_params) {
	return fetch(generate_url(text, params).toString())
		.then(response => response.json())
		.then((data: T.IApiResponse) => {
			// тут какой-то ваш код
			// someFunction(blablabla);
			console.log(data);
		});
};