#canvas practice

html canvas with nodejs

make paint board and meme maker

추가할 것.

font change => ctx.font =`bold 14px serif` 참고
font size change
ctx.font가 작동을 하지 않음..  
=> 해결
내부 입력순서문제
ctx.font =`bold 14px serif` ==> ctx.font=`14px bold serif` 순으로 작성

stroke fill change in text, pancil
ctx.fill이 작동을 하지 않음..
==> 해당 부분을 if 문으로 바꾸니 정상 작동.
==> switch 사용한 경우 발생 break와 return의 차이에서 발생하는 것으로 생각.
return을 통해 해당 함수를 완전히 탈출해야 fill이 작동하는 것으로 보인다.
추가
eraser, reset btn 사용 이후 일부 기능에서 이전 색 반영 X(흰색을 사용)
saver(); restore(); 을 사용하여 해결.
