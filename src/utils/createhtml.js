import fsp from "fs/promises";

export default async function createhtml(options) {
	const html = await fsp.readFile("./public/email.html", "utf-8");

	const newHtml = html.replace("{{name}}", options.name)
		.replace("{{token}}", options.token);

	return newHtml;
}