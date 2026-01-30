package quiz.quiz2_0121;

import java.util.Scanner;

public class UpDown {

	int answer = (int)((Math.random()*100)+1);
	int user;
	int count;
	boolean flag = false;
	
	UpDown () {
//		System.out.println(answer);
		
		do {
			System.out.print("1~100의 정수를 입력해주세요: ");
			Scanner scanner = new Scanner(System.in);
			user = scanner.nextInt();
			
			count++;
			
			if (user < this.answer) {
				System.out.println("UP");
				System.out.println();
			} else if (user > this.answer) {
				System.out.println("DOWN");
				System.out.println();
			} else if (user == this.answer) {
				System.out.println("정답!");
				System.out.println();
				System.out.println("총 시행횟수: " + count);
				flag = true;
			} else {
				System.out.println("잘못된 값입니다");
				System.out.println();
			}
			
		} while (flag == false);
	}
	
	
	
	
}
