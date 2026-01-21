package quiz.quiz1_0120;

public class QuizExam {

	public static void main(String[] args) {

		/** 문제2 (음악)
		 * 멜론 차트 관리하는 시스템
		 * 
		 * 목록을 관리하기 위해 클래스를 생성
		 * : 제목, 가수, 앨범명, 가사, 음악길이(초단위)
		 * 
		 * - 곡 2곡 이상의 정보를 저장
		 * - ViewInfo(method): 각 곡의 정보를 출력
		 * 
		 */
		
		Melon melon1 = new Melon();
		
		melon1.title = "Good Goodbye";
		melon1.artist = "화사";
		melon1.album = "Good Goodbye";
		melon1.lyrics = "...";
		melon1.time = 180;
		
//		melon.putInfo();
		melon1.viewInfo();
		System.out.println();
		
		Melon melon2 = new Melon();
		
		melon2.title = "Drowning";
		melon2.artist = "WOODZ";
		melon2.album = "OO-LI";
		melon2.lyrics = "...";
		melon2.time = 160;
		
//		melon.putInfo();
		melon2.viewInfo();
		System.out.println();
		
//		melon.viewAllSongs();
		
		
		/** 문제3 (영화)
		 * 영화 관리
		 * : 제목, 개봉년도
		 * 
		 * - method를 통해서 각 값을 따로 받아서, 따로 저장하기 : setter 개념
		 * - 각 값을 하나만 돌려주는 method : getter 개념
		 * - 모든 정보를 예쁘게 출력하는 method
		 * 
		 * - 2개 이상의 영화 관리
		 * 
		 * 추가문제 : 속편 제작
		 * - 원래 제목에 "2"를 붙여서 돌려주는 메소드
		 */
		
		Movie m1 = new Movie();
		
		m1.setTitle("기생충");
		m1.setYear(2019);
		
		m1.viewInfo();
		
		
		Movie m2 = new Movie();
		
		m2.setTitle("아바타");
		m2.setYear(2025);
		
		m2.viewInfo();
		
		m2.nextMovie();
		m2.viewInfo();
		
		
		/** 문제4 - 생성자 (카페 창업)
		 * 카페 창업
		 * - 카페 상호, 필요 자본금
		 * - 메뉴1, 메뉴2
		 * 
		 * 2호점 창업
		 * 
		 * 카페를 생성할 때, 상호와 필요 자본금을 꼭 입력해야 생성되도록
		 * 그리고 생성과 동시에, 메뉴1에는 아아, 메뉴2는 따아
		 */
		
		System.out.println("------ 카페 -------");
		System.out.println();
		
		Cafe c1 = new Cafe();
		
		c1.name = "컴포즈커피";
		c1.money = 30000000;
		c1.menus();
		
		c1.runCafe();
		System.out.println();
		System.out.println();
		
		Cafe c2 = new Cafe();
		
		c2.name = "메가커피";
		c2.money = 50000000;
		c2.menus();
		
		c2.runCafe();
		System.out.println();
		
		
		/** 문제5
		 * Emp
		 * - 사번, 이름, 직급, 연봉, 상사의 사번
		 * - 모든 정보를 출력하는 메소드 info()
		 * EmpExam
		 * - Emp를 3명 이상 만들기
		 * - 반복문으로 각자의 info() 실행
		 * 
		 * EmpTable
		 * - 사원 추가(Emp-전달인자)
		 * - arraylist
		 * - 출력(): 모든 사원 정보를 출력 
		 * 
		 * EmpExam
		 * - EmpTable 생성
		 * - Emp 3명 이상 생성
		 * - EmpTable에 모두 넣고
		 * - EmpTabel에 있는 모든 Emp 정보 출력
		 */
		
		// 5-1. 연봉이 2000만원 이상인 사원만 출력
		
		// 5-2. 사원1의 상사가 누구인지 출력
		
		/** 문제7 (선풍기 fan)
		 * 
		 * - method
		 * 전원 켜기
		 * 전원 끄기
		 * 약풍
		 * 강풍
		 * (단, 전원이 켜진 상태에서만 바람이 나옴)
		 */
		
		
		
		/** 문제8 (게임)
		 * Up and Down
		 * - while 사용해야 함
		 * 
		 * 어떤 정답이 있을 때 (random 1~10)
		 * 사용자가 입력하는 숫자에 따라 (Scanner)
		 * 정답보다 큰 숫자면 down을
		 * 정답보다 작은 숫자면 up을
		 * 정답과 같으면 정답! 출력 후 종료
		 */
		
		/** 문제 8-1
		 * 총 몇 번 만에 맞췄는가?
		 */
		
		
		
		/** 문제 9 (계산기)
		 * 
		 * 유일한 메소드 calc
		 * 	전달인자 3개 (ArrayList)
		 * 	값1, 연산자, 값2 (3, "-", 2)
		 * 	결과를 return
		 * 
		 * while로 종료 입력할 때까지
		 */
		
		/** 문제 9-1
		 * 계산 했던 로그(히스토리)를 확인하는 메소드 추가
		 */
		
		
		/** 문제 11 (TV)
		 * 
		 * 전원
		 * 볼륨(0~10 / up, down. mute으로 조절)
		 *  - 볼륨이 0 혹은 10일 때 더 줄이거나 늘이기 금지
		 * 채널 (직접 입력, up, down은 시간 나면)
		 * 
		 * 현재 상태 보기 : 전원, 볼륨, 채널 상태값 표시
		 */
		
		/** 문제 12 (회원가입, 로그인)
		 * 회원가입 받기
		 * 로그인 하기
		 * - 로그인 성공 시, "메인페이지" 출력
		 * - 로그인 실패 시, "다시 로그인 하세요" 출력
		 * 
		 * main에서 [회원](클래스)을 생성.
		 * - 단, 아이디, 비번 없이 생성 불가능
		 * 생성한 [회원] 목록이 필요
		 * 
		 * "로그인"(메소드) 전달인자 아이디, 비번
		 * - 리턴은 로그인 성공여부
		 */
		
		/** 문제 13 (MES)
		 * 
		 * [Item] 제품
		 * - 필드: 이름
		 * - 생성자: 이름 필수
		 * - 메소드: 이름을 리턴
		 * 
		 * [Process] 공정 (일 하는 방법, 순서)
		 * - 메소드: run (실행)
		 * 	- 전달인자: item
		 *  - 리턴타입: 없음
		 * 하는 일: Item이름 + "생산 완료" 출력
		 * 
		 * [Execution] 실행 = main
		 * - 메소드: main
		 * - 제품 1과 제품 2 생성
		 * - 공정 run에 넣고 실행하기
		 */
		
		/** 문제 14 (펜션 예약 관리)
		 * 여러 개의 방이 있음
		 * 방에는
		 *  - 최대인원, 반려동물 여부, 바베큐장 여부
		 *  
		 *  규칙:
		 *  - 방은 하루에 한 번만 예약 가능
		 *  - 시작일, 종료일로 예약 가능
		 *   - 1 ~ 10일 간 예약 가능
		 *  - 지정 날짜로 예약
		 */
		
		/** 문제 14-1
		 * 시작일, 종료일로 예약 가능하도록
		 */
		
		/** 문제 15 (게임)
		 * 포켓몬 골드
		 * 
		 * 리그 (리그명 필수)
		 * 참가 포켓몬 수 4마리
		 * 참가 (전달인자 포켓몬)
		 * 포켓몬 - 공격력 수치, 방어 수치, 체력
		 *  - 내가 10의 공격력이고 저쪽의 방어력이 4면 : 공격 시 6의 체력 감소
		 *  - 체력 수치, 공격력, 방어력, 이름 필드
		 * 배틀 (메소드) 에서 1번-2번 배틀 (전달인자로 포켓몬 2마리)
		 *  - 한 쪽의 체력이 0이 될 때까지
		 *  - 체력이 0이 된 쪽이 lose
		 *  - 공격은 턴제
		 */
		
		
	} // main end

} // end
