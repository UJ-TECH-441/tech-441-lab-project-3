$(document).ready(function() {
	for (let i = 1; i <= 100; i++) {
		$('#min').append(`<option value=${i}>${i}</option>`);
		$('#max').append(`<option value=${Math.abs(i - 101)}>${Math.abs(i - 101)}</option>`);
	}
	$('#submit').on('click', () => guess());
});

const guess = () => {
	$('#results-numbers').css('visibility', 'visible');
	$('#results-numbers-guess').text('');

	// Read min/max values
	const min = $('#min').val();
	const max = $('#max').val();

	/* POST method */
//	fetch(`/guess-number`, {
//		method: 'POST',
//		body: JSON.stringify({ min, max }),
//		headers: { 'Content-Type': 'application/json' }
//	})
	/* GET method */
	fetch(`/guess-number?min=${min}&max=${max}`, { method: 'GET' })
		.then(resp => resp.json())
		.then(result => {
			// Create some artificial suspense; add one dot each second until 3 seconds have passed
			let wait = 0;
			let interval = setInterval(() => {
				if (wait < 3) {
					$('#results-numbers-guess').text($('#results-numbers-guess').text() + '.');
				} else {
					$('#results-numbers-guess').text(result.guess);
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
