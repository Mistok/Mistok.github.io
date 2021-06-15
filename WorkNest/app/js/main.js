$(function () {
	let equalHeight = () => {
		let heightStart = document.getElementById('about_block_title').getBoundingClientRect().top;
		let heightEnd = document.getElementById('about_block_privacy').getBoundingClientRect().bottom;

		let newHeight = heightEnd - heightStart
		let secondColl = document.getElementById('content_block_scrollable');
		secondColl.style.maxHeight = newHeight + 'px' ;
	}
	equalHeight()
})