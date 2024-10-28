document.getElementById('highScore').innerHTML = localStorage.getItem("highScore")
document.getElementById('start-button').addEventListener('click', function() {
    window.location.href = 'snake.html'
});
document.getElementById('initHighScore').addEventListener('click', function() {
    localStorage.setItem("highScore", 0)
    document.getElementById('highScore').innerHTML = localStorage.getItem("highScore")
});