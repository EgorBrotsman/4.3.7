const URL_REPO = new URL('https://api.github.com/search/repositories')

const inputSearch = document.querySelector(".search-repo");
const listSearchRepo = document.querySelector(".auto-com__list");

const debounce = (fn, debounceTime) => {
	let timeout;
	return function () {
		const fnCall = () => {
			fn.apply(this, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, debounceTime);
	};
};


const getRepo = async (url, pageLimit, nameRepo) => {
	url.searchParams.set("q", nameRepo);
	url.searchParams.set("per_page", `${pageLimit}`);

	const response = await fetch(url)
	const data = await response.json()
	return data.items
}

const createItemListSearch = (repo) => {
	const li = document.createElement('li')
	li.textContent = repo.name
	li.classList.add("auto-com__item");
	listSearchRepo.appendChild(li)
}

const createListSearch = (repos) => {
	if (!repos) listSearchRepo.innerHTML = '';
	repos.forEach(el => {
		createItemListSearch(el);
	})
}


const addRepo = (e) => {
	if (e.target.classList.value === "auto-com__item") {
		console.log(e.target)
	}
}

function search(e) {
	if (e.target.value.trim()) {
		getRepo(URL_REPO, 5, e.target.value)
			.then(response => {
				createListSearch(response)
			});
		listSearchRepo.innerHTML = ""
	} else {
		listSearchRepo.innerHTML = "";
	}
}

search = debounce(search, 500);

inputSearch.addEventListener("keyup", search);
listSearchRepo.addEventListener('click', addRepo)