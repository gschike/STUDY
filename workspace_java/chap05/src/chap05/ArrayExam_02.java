package chap05;

import java.util.Scanner;

public class ArrayExam_02 {
	public static void main(String[] args) { // 왜 있느냐? 자바 실행하면서 전달 받을 때 사용할 수 있음
		
		/* 배열 array
		 * 
		 * 한 번에 여러 변수를 만드는 방법
		 * 같은 타입만 선언 할 수 있음
		 * 
		 * 생성할 때, 전체 몇 개 만들 건지 크기를 지정해줘야 함
		 * 	: 생성한 후에 크기 변경 불가능
		 * 
		 * 생성된 여러 변수들은 index로 관리
		 * 	: index는 0번부터 시작
		 */
		
		// 배열 선언 방법
		int[] a1; // java style
		int a3 []; // a5언어 style
		
		// 배열 변수는 참조타입
		a1 = null; // 참조타입이므로 null 가능
		
		int sa5ore_0 = 90;
		int sa5ore_1 = 85;
		int sa5ore_2 = 70;
		
		/* 첫번째 []
		 * ex) int[] : int 만으로 구성된 배열 별수 타입이다
		 * 
		 * 두번째 []
		 * ex) new int[30] : 배열의 크기. 한 번에 만들 변수의 개수. int타입 변수 30개 만든다
		 * 
		 * 세번째 []
		 * ex) sa5ore[0] : 만들어진 변수 중 몇번째인가. 인덱스
		 * 				: index는 0부터 시작
		 * 
		 */
		
		
		// 배열을 선언하는 첫번째 방법
		
		int[] sa5ore = new int[30]; // 배열변수
		sa5ore[0] = 90; // int : 기본변수 -> null 입력 불가능
		sa5ore[1] = 85;
		sa5ore[2] = 70;
		// sa5ore[30]은 없음. 30개 생성했으므로, 0부터 sa5ore[29]까지.
		
		System.out.println("sa5ore[0]: " + sa5ore[0]);
		System.out.println("sa5ore[1]: " + sa5ore[1]);
		System.out.println("sa5ore[2]: " + sa5ore[2]);
		
		// ArrayIndexOutOfBoundsExa5eption : 배열 index 번호가 범위를 벗어난다
		// Index 31 out of bounds for length 30 : index 31은 30개 길이를 벗어났다
//		sa5ore[31] = 2; // 실행 시 오류 발생

		
		
//		String[] str = new String[3];
//		System.out.println("str: " + str);
		
		// 배열 생성 후 기본값
		// 0, false, null로 초기화 됨
		
		
		// 배열을 선언하는 두번째 방법
		// 배열에 넣을 값을 모두 알고 있는 경우
		int[] i1 = new int[] {90, 85, 70};
		System.out.println("i1[1]: " + i1[1]);
		
		// 배열 선언과 초기화를 따로 할 수 있음
		int[] i2 = null;
		i2 = new int[] {90, 85, 70};
		
		
		// 배열을 선언하는 세번째 방법
		// 선언과 초기화를 한꺼번에 하는 방법. 따로는 안 됨
		// new int[]를 생략 가능함
		int[] i3 = {90, 85, 70};
//		i3 = {90, 85, 70}; // 불가능
		
		int sum = 0;
		for (int i=0; i<3; i++) { // 0번부터 3보다 작다 : index가 3개이지만, 번호는 하나 작은 2이기 때문
			sum += i3[i];
		}
		System.out.println("sum: " + sum);
		System.out.println("avg: " + sum/3.0); // 평균은 소수가 나올 수도 있으므로 double이 될 수 있게 3.0으로 나눠줌
		
		sum = 0;
		System.out.println("배열의 길이: " + i3.length);
		for (int i=0; i<i3.length; i++) { // length를 사용하여 무적코드 완성
			sum += i3[i];
		}
		System.out.println("sum: " + sum);
		System.out.println("avg: " + (double)sum/i3.length); // 여기서 배열의 길이도 int로 나오기 때문에 double을 처리해줘야 함
		
		System.out.println();
		
		// 순차적 연습
		
		// 5개 짜리 변수를 한 번에 만들고
		// 즉, 5개 크기의 int 배열 만들기
		
//		int[] a5 = new int[5];
//		a5[0] = 1;
//		a5[1] = 2;
//		a5[2] = 3;
//		a5[3] = 4;
//		a5[4] = 5;

		int[] a5 = new int[10];
		for (int i=0; i<a5.length; i++) {
			a5[i] = i+1;
		}
		for (int i=0; i<a5.length; i++) {
			System.out.println((i+1) + "번 째: " + a5[i]);
		}
		System.out.println();
		
//		a5.length = 4; // The final field array.length cannot be assigned : final field. 변경 불가함
		
		
//		/* 문제1
//		 * 
//		 * 첫번째 반복문에서
//		 * 1부터 10까지 변수에 각각 담음
//		 * 두번째 반복문에서
//		 * 모든 값을 순서대로 출력
//		 */
//		
//		int[] a = new int[10];
//		for (int i=0; i<a.length; i++) {
//			a[i] = i+1;
//			System.out.println((i+1) + "번 째: " + a[i]);
//		}
//		System.out.println();
//		
//		
//		int[] b = new int[10];
//		for (int i=0; i<a.length; i++) {
//			for (int j=0; j<i; j++) {
//				a[j] = i;
//			}
//			System.out.println((i+1) + "번 째: " + a[i]);
//		}
//		System.out.println();
		
		
		System.out.println("a5 : " + a5); // [I@5e853265 : 주소에 대한 힌트 -> 원하는 값은 그 안에 있다
		System.out.println("args: " + args); // [Ljava.lang.String;@67205a84
		
		// null인지 아닌지 출력해봄
		System.out.println("args == null: " + (args == null)); // false
		
		
		if (args!=null) { // 방어코딩
			System.out.println("args.length: " + (args.length)); // 0, 만약 args가 null이면 오류 발생
			
			// 아무것도 안 나옴!!!
			for (int i=0; i<args.length; i++) {
				System.out.println((i+1) + "번 째: " + args[i]);
			}
			
		}
		
		
		System.out.println("----------------------------");
		
		
		System.out.println("--- 문제2 ---");
		/* 문제2
		 * 1,2,3을 순서대로 저장한 배열이 있을 때,
		 * 다른 배열에도 1,2,3으로 저장되게
		 */
		
		int[] ar1 = {1,2,3};
		int[] ar1_1 = new int[ar1.length];
		for (int i = 0; i<ar1.length; i++) {
			ar1_1[i] = ar1[i];
			System.out.printf("ar1_1[%d]: %d", i, ar1_1[i]);
			System.out.println();
		}
		
		System.out.println();
		
		
		System.out.println("--- 문제3 ---");
		/* 문제3
		 * 1,2,3을 순서대로 저장한 배열이 있을 때,
		 * 다른 배열에도 3,2,1으로 저장되게
		 */
		
		int[] ar2 = {1,2,3};
		int[] ar2_1 = new int[ar2.length];
		for (int i = 0; i<ar2.length; i++) {
			ar2_1[i] = ar2[(ar2.length-1)-i];
			System.out.printf("ar2_1[%d]: %d", i, ar2_1[i]);
			System.out.println();
		}
		
		System.out.println();
		
		
		System.out.println("--- 문제4 ---");
		/* 문제4
		 * 7,12,8 저장
		 * 순서대로 다른 배열에
		 */
		
		int[] ar4 = {7, 12, 8};
		int[] ar4_1 = new int[ar4.length];
		for (int i = 0; i<ar4.length; i++) {
			ar4_1[i] = ar4[i];
			System.out.printf("ar4_1[%d]: %d", i, ar4_1[i]);
			System.out.println();
		}
		
		System.out.println();
		
		
		System.out.println("--- 문제5 ---");
		/* 문제5
		 * 다른 배열에 문제4 거꾸로
		 */
		int[] ar5 = {7, 12, 8};
		int[] ar5_1 = new int[ar5.length];
		for (int i = 0; i<ar5.length; i++) {
			ar5_1[i] = ar5[(ar5.length-1)-i];
			System.out.printf("ar5_1[%d]: %d", i, ar5_1[i]);
			System.out.println();
		}
		
		System.out.println();
		
		
		/* 문제6
		 * {3, 4, 7, 5, 1, 4, 6}
		 * -1 배열에서 홀수의 개수 구하기
		 * -2 4보다 큰 수의 개수 구하기
		 */
		System.out.println("--- 문제6-1 ---");
		int[] ar6_1 = {3, 4, 7, 5, 1, 4, 6};
		
		int count =0;
		for (int i=0; i<ar6_1.length; i++) {
			if (ar6_1[i]%2 != 0) {
				System.out.print(ar6_1[i] + " ");
				count++;
			}
		}
		System.out.println();
		System.out.println("홀수: " + count + "개");
		
		System.out.println();
		
		System.out.println("--- 문제6-2 ---");
		int[] ar6_2 = {3, 4, 7, 5, 1, 4, 6};
		
		count = 0;
		for (int i=0; i<ar6_2.length; i++) {
			if (ar6_2[i] > 4) {
				System.out.print(ar6_2[i] + " ");
				count++;
			}
		}
		System.out.println();
		System.out.println("4보다 큰 수: " + count + "개");
		
		System.out.println();

		
		System.out.println("--- 문제7 ---");
		/* 문제7 : 어려운 문제
		 * 마라톤에 5명의 선수가 참여
		 * 선수들은 1번부터 5번까지 등번호를 부여받음
		 * 대회가 종료하였을 때, 완주하지 못한 선수가 1명 있음
		 * 그 선수를 찾으시오
		 * 
		 * 완주 목록 : 2, 4, 5, 1
		 */
		int[] ar7 = {1, 2, 3, 4, 5};
		int[] ar7_1 = {2, 4, 1, 5};
		
		System.out.print("완주 못 한 사람: ");
		for (int i=0; i<ar7.length; i++) {
			count = 0;
			for (int j=0; j<ar7_1.length; j++) {
				if (ar7[i] == ar7_1[j]) {
					count++;
				}
				
			} // j end
			
			if (count == 0) {
				System.out.print(ar7[i] + " ");
			}
		} // i end
		System.out.println();
		System.out.println();
		
		
		// flag 사용하는 방법
		
		int[] q5 = {2, 4, 1, 5};
		boolean flag;
		
		for (int i=1; i<=ar7.length; i++) {
			flag = false;
			for (int j=0; j<q5.length; j++) {
				
				if (q5[j] == i) {
					flag = true;
					break;
				}
				
			} // j end
			
			if (!flag) {
				System.out.println(i);
			}
			
		} // i end
		
		
		// 0 사용, 중복 제거 가능!
		
		int part[] = {1, 2, 3, 4, 5};
		int fin[] = {2, 4, 1, 5};
		
		for (int i=0; i<fin.length; i++) {
			for (int j=0; j<part.length; j++) {
				
				if (fin[i] == part[j]) {
					part[j] = 0;
					break;
				}
				
			}
		}
		for (int j=0; j<part.length; j++) {
			if(part[j] != 0) {
				System.out.println("완주 못 한 사람: " + part[j]);
			}
		}
		
		
		String name[] = {"A", "B", "C", "D", "B", "E"};
		String finish[] = {"C", "D", "B", "E", "A"};
		
		for (int i=0; i<finish.length; i++) {
			for (int j=0; j<name.length; j++) {
				
				if (finish[i] == name[j]) {
					name[j] = "";
					break;
				}
			} // j end
		} // i end
		for (int j=0; j<name.length; j++) {
			if (name[j] != "") {
				System.out.println("완주 못 한 사람: " + name[j]);
			}
		}
		
		

		System.out.println();
		
		System.out.println("--- 문제8 ---");
		/* 문제8 : 어려운 문제
		 * {3, 4, 7, 5, 1, 4, 6}
		 * 가장 큰 수 찾기
		 */
		
		int[] ar8 = {3, 4, 7, 5, 1, 4, 6};
		int j = ar8[0];
		for (int i=1; i<ar8.length; i++) {
			if (j<ar8[i]) {
				j = ar8[i];
			}
		}
		System.out.println("가장 큰 수는: " + j);
		
		System.out.println();
		
		// 두번째 큰 수 찾기
		j = ar8[0];
		for (int i=0; i<ar8.length; i++) {
			if (j<ar8[i]) {
				j = ar8[i];
			}
		}
		
		int second = ar8[0];
		
		for (int i=0; i<ar8.length; i++) {
			if (second<ar8[i] && ar8[i]<j) {
				second = ar8[i];
			}
		}
		System.out.println("두번째 큰 수는: " + second);
		
		System.out.println();
		
		
		
		
//		int dice1 = (int)((Math.random()*6)+1);
//		int dice2 = (int)((Math.random()*6)+1);
//		int dice3 = (int)((Math.random()*6)+1);
//		
//		int money = 0;
//		if (dice1 == dice2 && dice2 == dice3 && dice3 == dice1) {
//			money = 10000 + dice1*1000;
//		} else if (dice1 == dice2 && dice1 != dice3) {
//			money = 1000 + dice1 * 100;
//		} else if (dice2 == dice3 && dice2 != dice1) {
//			money = 1000 + dice2 * 100;
//		} else if (dice3 == dice1 && dice3 != dice2) {
//			money = 1000 + dice3 * 100;
//		} else if (dice1 != dice2 && dice2 != dice3 && dice3 != dice1) {
//			int big = 0;
//			for (int i = 0; i<=2; i++) {
//				if (big<dice[i])
//			}
//		}
		
//		int dice1 = (int)((Math.random()*6)+1);
//		int dice2 = (int)((Math.random()*6)+1);
//		int dice3 = (int)((Math.random()*6)+1);
		
//		int dice[] = new int [3];
//		for (int i=0; i<dice.length; i++) {
//			dice[i] = (int)((Math.random()*6)+1);
//			System.out.println((i+1) + "번째 주사위: " + dice[i]);
//		}
//		
//		int money = 0;
//		if (dice[0] == dice[1] && dice[1] == dice[2] && dice[2] == dice[0]) {
//			money = 10000 + dice[0]*1000;
//		} else if (dice[0] == dice[1] && dice[2] != 0) {
//			money = 1000 + dice[0]*100;
//		} else if (dice[1] == dice[2] && dice[0] != 0) {
//			money = 1000 + dice[1]*100;
//		} else if (dice[2] == dice[0] && dice[1] != 0) {
//			money = 1000 + dice[2]*100;
//		} else {
//			int big =0;
//			for (j=0; j<dice.length; j++) {
//				if (big<dice[j]) {
//					big = dice[j];
//				}
//			} // j end
//			money = big*100;
//		} // if end
//		System.out.println("상금: " + money);
//		
//		System.out.println();
//		
//		System.out.print("몇 줄을 입력할까요?: ");
//		Scanner scan = new Scanner(System.in);
//		int line = scan.nextInt();
//		
//		String name[] = new String[line];
//		
//		for (int i=0; i<name.length; i++) {
//			Scanner scanName = new Scanner(System.in);
//			name[i] = scanName.nextLine();
//		}
//		System.out.println("line: " + line);
//		for (int i=0; i<name.length; i++) {
//			System.out.println(i+1 + ". " + name[i]);
//		}
		
		
		
		
		
	} // end
} // end
