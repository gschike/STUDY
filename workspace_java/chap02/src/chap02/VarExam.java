package chap02;

public class VarExam {

	public static void main(String[] args) {
		
		// 변수 선언
		int value;
		// 변수에 값 넣기 / 변수에 할당
		value = 5;
		// 합쳐서 int value = 5; 이런 식으로 사용도 가능
		
		// value의 값을 cosole에 출력하라
		System.out.println(value);
		
		value = 6; // value의 값을 5에서 6으로 덮어쓰기 함

		System.out.println(value);
		// 실행하면 5 먼저 출력하고, 6 출력해서 5 6 나옴
		
		int result;
		// System.out.println(result); // 변수에 값 저장 안 하고 실행하면 에러남
		// 에러 창의 링크로 들어가면 에러 난 부분으로 이동함
		
		result = value + 10;
		System.out.println(result); // value의 마지막 값 6 + 10
		
		int hour = 3; // 선언과 동시에 초기화(값 할당)
		int minute = 5;
		
		System.out.println(hour + "시" + minute + "분");
		System.out.println(hour*60 + minute + "분");
		System.out.println(hour + minute);
		
		System.out.println("value: " + value);
		
		// 이미 앞에서 사용된 변수의 이름은 다시 선언할 수 없음. 오류남
		// int hour = 4;
		
		
		// 지역변수
		int x = 10;
		{
			System.out.println("x: "+ x);	
			int y = 5;
			System.out.println("y: "+ y);
			{
				System.out.println("y: "+ y);
			}
		} // garbage collector에 의해서 중괄호 안에서 선언한 내용은 모두 버려짐
		// System.out.println("y: "+ y); // 중괄호 안에서 선언한 변수는 중괄호 다음에 출력 불가능
		
	}
}
