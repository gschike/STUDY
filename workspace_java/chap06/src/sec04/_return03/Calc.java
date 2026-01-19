package sec04._return03;

public class Calc {

	// 두 int를 받아서, 더한 결과를 돌려주는 method
	
	int plus (int a, int b) {
		return a+b;
	}
	
	// 두 int를 받아서, 평균을 double로 돌려주는 method
	double avg (int x, int y) {
//		int sum = x+y; // 이미 위에 있음! 위에 꺼 갖다가 쓰겠다..
		int sum = plus(x, y);
		double result = (double)sum/2;
		
		return result;
	}
	
	/**
	 * 	int plus (int a, int b) {
		return a+b;
		}
		
		avg에 plus가 사용되고 있을 때,
		이런식으로 아래에 있어도 됨. 순서 상관없이 불러오기 가능
	 */
	
	
	
	void execute(int j1, int j2) {
		double result = avg(j1, j2);
		System.out.printf("%d 와 %d의 평균: %.2f", j1, j2, result);
	}
	
	
	
} // field end
