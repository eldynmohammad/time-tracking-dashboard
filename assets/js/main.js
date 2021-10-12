const periodical = document.querySelectorAll('.profile__periodical-text')
const details = document.querySelectorAll('.activities')
const data = []

// ---------- Load first data - Daily ----------
fetch('assets/js/data.json')
	.then(function (response) {
		return response.json()
	})
	.then(function (data) {
		loadData(data)
	})

function loadData(data) {
	details.forEach(d => d.innerHTML = `
            ${data.map(function (card) {
		return `
			<div class="card ${card.title.toLowerCase().split(' ').join('-')} activities__content">
				<div class="activities__details card__inside">
					<div class="activities__details-top flex">
						<div class="activities__name">${card.title}</div>
						<div class="three-dots flex">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div class="activities__details-bottom flex">
						<p class="activities__current">${card.timeframes.daily.current}hrs</p >
						<p class="activities__previous">Yesterday - <span class="previous">${card.timeframes.daily.previous}hrs</span></p>
					</div >
				</div>
			</div>
			`
	}).join("")}`)
}

// ---------- Click each links - change content ----------
function linkAction() {
	periodical.forEach(per => per.classList.remove('active-text'))
	this.classList.add('active-text')
	const text = this.text;
	const period = text.toLowerCase();
	fetch('assets/js/data.json')
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			loadData(data, period)
		})

	function loadData(data, a) {
		details.forEach(d => d.innerHTML = `
            ${data.map(function (card) {
			return `
			<div class="card ${card.title.toLowerCase().split(' ').join('-')} activities__content">
				<div class="activities__details card__inside">
					<div class="activities__details-top flex">
						<div class="activities__name">${card.title}</div>
						<div class="three-dots flex">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div class="activities__details-bottom flex">
						<p class="activities__current">${a == 'daily' ? `${card.timeframes.daily.current}hrs` : a == 'weekly' ? `${card.timeframes.weekly.current}hrs` : `${card.timeframes.monthly.current}hrs`}</p >
						<p class="activities__previous">${a == 'daily' ? 'Yesterday' : a == 'weekly' ? 'Last Week' : 'Last Month'} - <span class="previous">${a == 'daily' ? `${card.timeframes.daily.previous}hrs` : a == 'weekly' ? `${card.timeframes.weekly.previous}hrs` : `${card.timeframes.monthly.previous}hrs`}</span></p>
					</div >
				</div>
			</div>
			`
		}).join("")}
            `)
	}
}
periodical.forEach(p => p.addEventListener('click', linkAction))