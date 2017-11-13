(() => {
  const submitEl = document.querySelector('#submit')
  const urlEl = document.querySelector('#url-input')
  const resultEl = document.querySelector('#result')
  const loadingEl = document.querySelector('#loading')

  function showLoading () {
    loadingEl.style.display = 'block'
  }

  function hideLoading () {
    loadingEl.style.display = 'none'
  }

  function errorAlert (error) {
    if (error) {
      console.error(error)
    }
    hideLoading()
    window.alert('出错了!')
  }

  submitEl.addEventListener('click', () => {
    if (!urlEl.value || !urlEl.value.match(/(https?):\/\//)) {
      return window.alert('Please input url!')
    }
    resultEl.style.display = 'none'
    showLoading();
    fetch(`${window.location.origin}/api/create`, {
      method: 'POST',
      body: `url=${urlEl.value}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (response.status !== 200) {
        return errorAlert()
      }
      response.json().then((data) => {
        resultEl.setAttribute('href', data.image)
        resultEl.style.display = 'inline-block'
        hideLoading()
      })
    }, (error) => {
      errorAlert(error)
    })
  })

  document.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
      submitEl.click()
    }
  })
})()
