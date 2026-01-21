package quiz.quiz1_0120;

import java.util.Scanner;

public class Baseball {
	
	boolean[] number = new boolean[10]; 
	int[] answer = new int[4];
	int[] user = new int[4];
	
	boolean flag;
	int count;
	int tries;
	
	boolean stop;
	
	Baseball() {
		
		for (int i=0; i<answer.length;) {
			int num = (int)(Math.random()*10); // 0~9 랜덤
			
			if (number[num] == false) {
				answer[i] = num;
				
//				System.out.println(answer[i]);
				
				number[num] = true;
				i++;
			}
		}
		
		
		// strike
		do {
			do {
				Scanner scanner = new Scanner(System.in);
				tries++;
				
				for (int i=0; i<user.length;) {
					int input = scanner.nextInt();
					if (input >= 10) {
						System.out.println("잘못된 숫자입니다");
					} else {
						user[i] = input;
						i++;
						count++;
					}
					
					if (count == 4) {
						flag = true;
					}
				}
			} while (flag == false);
			
			for (int i=0; i<user.length; i++) {
				if (answer[i] == user[i]) {
					System.out.print("strike ");
				} else if (user[i] == answer[0] || user[i] == answer[1] || user[i] == answer[2] || user[i] == answer[3]) {
					System.out.print("ball ");
				} else {
					System.out.print("X ");
				}
			}
			System.out.println();
			
			if (user[0] == answer[0] && user[1] == answer[1] && user [2] == answer[2] && user[3] == answer[3]) {
				System.out.println("정답입니다!");
				System.out.println("시도횟수: " + tries);
				stop = true;
			}
			
		} while (stop == false);
		
		
	} // Baseball end
	
	
	
	
}
