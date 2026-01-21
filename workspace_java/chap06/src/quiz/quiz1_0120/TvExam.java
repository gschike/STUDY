package quiz.quiz1_0120;

public class TvExam {
	
	public static void main(String[] args) {
		
		/** 문제 11 (TV)
		 * 
		 * 전원
		 * 볼륨(0~10 / up, down. mute으로 조절)
		 *  - 볼륨이 0 혹은 10일 때 더 줄이거나 늘이기 금지
		 * 채널 (직접 입력, up, down은 시간 나면)
		 * 
		 * 현재 상태 보기 : 전원, 볼륨, 채널 상태값 표시
		 */
		
		Tv tv = new Tv();
		
		tv.volumeUp();
		tv.viewNow();
		
		tv.powerOn();
		tv.channel(40);
		tv.channelDown();
		tv.volumeDown();
		tv.volumeUp();
		tv.volumeUp();
		tv.viewNow();
		
	} // method

} // field
