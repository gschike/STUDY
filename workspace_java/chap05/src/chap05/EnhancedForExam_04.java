package chap05;

public class EnhancedForExam_04 {

	public static void main(String[] args) {

		
		int[] scores = {1, 2, 3, 4, 5};
		
		int s1 = scores[0];
		
		// 향상된 for문
		// 하나씩 꺼내서 담을 변수 : 반복할 수 있는 것(객체)
		
		int count = 0;
		for (int s : scores) { // s는 지역변수 | 중간에 멈추는 거 없음
			// scores의 첫번째 거 꺼내져서 s, 두번째 거 꺼내져서 s...
			System.out.println(s); // 1 2 3 4 5
			
			// 중간에 멈추는 경우!
//			count++;
//			if (count==3) {
//				break;
//			}
		}
		
		System.out.println();
		
		// 둘은 완벽히 같은 것!!
		
		for (int i=0; i<scores.length; i++) {
			int s = scores[i];
			System.out.println(s);
		}
		
		
	} // end
	
} // end
