$(function () {
	let equalHeight = () => {
		if(document.documentElement.clientWidth > 780){
			let heightStart = document.getElementById('about_block_title').getBoundingClientRect().top;
			let heightEnd = document.getElementById('about_block_privacy').getBoundingClientRect().bottom;

			let newHeight = heightEnd - heightStart
			let secondColl = document.getElementById('content_block_scrollable');
			secondColl.style.maxHeight = newHeight + 'px' ;
		} else {
			let secondColl = document.getElementById('content_block_scrollable');
			secondColl.style.maxHeight = 200 + 'vh' ;
		}
	}
	// equalHeight()
})