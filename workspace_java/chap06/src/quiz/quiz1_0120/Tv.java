package quiz.quiz1_0120;

public class Tv {
	
	/** 문제 11 (TV)
	 * 
	 * 전원
	 * 볼륨(0~10 / up, down. mute으로 조절)
	 *  - 볼륨이 0 혹은 10일 때 더 줄이거나 늘이기 금지
	 * 채널 (직접 입력, up, down은 시간 나면)
	 * 
	 * 현재 상태 보기 : 전원, 볼륨, 채널 상태값 표시
	 */
	
	
	boolean power;
	int volume;
	int channel = 999;
	
	// 전원
	void powerOn() {
		this.power = true;
	}
	void powerOff() {
		this.power = false;
	}
	
	// 볼륨
	void volumeUp() {
		if (this.power == true) {
			if(this.volume<10) {
				this.volume++;
			}
		}
	}
	void volumeDown() {
		if (this.power == true) {
			if(this.volume>0) {
				this.volume--;
			}
		}
	}
	
	// 채널
	void channel(int channel) {
		this.channel = channel;
	}
	void channelUp() {
		if (this.power == true) {
			if(this.channel<999) {
				channel++;
			}
		}
	}
	void channelDown() {
		if (this.power == true) {
			if(this.channel>0) {
				this.channel--;
			}
		}
	}
	
	// 상태 확인
	void viewNow() {
		if (this.power) {
			System.out.println("전원: 켜짐");
			System.out.println("채널: " + this.channel);
			System.out.println("볼륨: " + this.volume);
		} else {
			System.out.println("전원: 꺼짐");
		}
	}
	
}
