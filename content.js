chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message == 'clicked_browser_action'){
      chrome.runtime.sendMessage({'message': 'open_new_tab', 'url': 'https://www.surveymonkey.com/r/CubicVotes'})
      window.localStorage.setItem('clickedCubic', 'true')
    }
  }
);

const checkTime = () => {
	if(!window.localStorage.getItem('clickedCubic') && !window.sessionStorage.getItem('alertedCubic')){
		let current = new Date()
		current = current.getHours() + ':' + (current.getMinutes() < 10 ? '0' + current.getMinutes() : current.getMinutes()) + ':' + (current.getSeconds() < 10 ? '0' + current.getSeconds() : current.getSeconds())
		// console.log(current)
		if(current == '10:00:00'){
			window.sessionStorage.setItem('alertedCubic', 'true')
			const doVote = confirm('Vote, dummies!')
			if(doVote){
				chrome.runtime.sendMessage({'message': 'open_new_tab', 'url': 'https://www.surveymonkey.com/r/CubicVotes'})
	      window.localStorage.setItem('clickedCubic', 'true')
			}
		}
		setTimeout(checkTime, 500)
	}
}

checkTime()