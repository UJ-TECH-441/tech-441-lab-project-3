$(document).ready(function() {
	for (let i = 1; i <= 100; i++) {
		$('#min').append(`<option value=${i}>${i}</option>`);
		$('#max').append(`<option value=${Math.abs(i - 101)}>${Math.abs(i - 101)}</option>`);
	}
	$('#submit').on('click', () => guess());
});

let voted = false;

const guess = () => {
	$('#results-numbers').show();
	$('#results-numbers-correct').hide();
	$('#results-numbers-guess').text('');
	$('.vote').removeClass('fa-solid');
	$('.vote').addClass('fa-regular');

	// Read min/max values
	const min = $('#min').val();
	const max = $('#max').val();

	/* POST method */
//	fetch(`/numbers/guess`, {
//		method: 'POST',
//		body: JSON.stringify({ min, max }),
//		headers: { 'Content-Type': 'application/json' }
//	})
	/* GET method */
	fetch(`/numbers/guess?min=${min}&max=${max}`, { method: 'GET' })
		.then(resp => resp.json())
		.then(result => {
			// Create some artificial suspense; add one dot each second until 3 seconds have passed
			let wait = 0;
			let interval = setInterval(() => {
				if (wait < 3) {
					$('#results-numbers-guess').text($('#results-numbers-guess').text() + '.');
				} else {
					voted = false;
					$('#results-numbers-guess').text(result.guess);
					$('#results-numbers-correct').show();
					clearInterval(interval);
				}
				wait++;
			}, 1000);
		})
		.catch(err => {
			console.error(err);
			$('#error').html('Error');
			$('#error').show();
		});
};

const vote = (element, correct) => {
	if (voted) return; // Only one vote per guess
	$(element).removeClass('fa-regular');
	$(element).addClass('fa-solid');
	fetch(`/numbers/vote`, {
		method: 'POST',
		body: JSON.stringify({ correct }),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(resp => resp.json())
	.then(result => {
		voted = true;
		$('#score').html(`The Mindreader's current accuracy rate is 
			${(100 * (result.correct / result.votes)).toFixed(2)}% 
			(${result.correct}/${result.votes} votes)`);
		$('#score').show();
	})
	.catch(err => {
		console.error(err);
		$('#error').html('Error');
		$('#error').show();
	});
};
