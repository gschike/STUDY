
public class Index {

	public static void main(String[] args) {
		
//		String name1 = new String("신용권");
//		String name2 = new String("신용권");
//		String name3 = name1;
//		
//		String name4 = "신용권";
//		String name5 = "신용권";
//		
//		
//		System.out.println(name1 == name2);
//		System.out.println(name1 == name3);
//		System.out.println(name1 == "신용권");
//		System.out.println(name1.equals("신용권"));
//		System.out.println(name4 == name5); // true
//		
//		name1 = null; // null로 값 삭제 가능
//		System.out.println(name1);
		
		
		String name[] = { "신용권", "홍길동", "김자바" }; // 0 ~ 2에 저장
		
		System.out.println(name[2]); // 3 이상 입력하면 오류남!!
		
		
		int score[] = { 83, 90, 87 };
		
		System.out.println("score[0]: " + score[0]);
		System.out.println("score[1]: " + score[1]);
		System.out.println("score[2]: " + score[2]);
		
		int sum = 0;
		for (int i=0; i<3; i++) {
			sum += score[i];
		}
		System.out.println("총합: " + sum);
		double avg = (double)sum/3;
		System.out.println("평균: " + avg);
		
		
	} // end
} // end
