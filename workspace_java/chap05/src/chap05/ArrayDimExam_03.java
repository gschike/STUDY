package chap05;

public class ArrayDimExam_03 {
	public static void main(String[] args) {

		int a0 = 5;
		int a1 = 15;
		int a2 = 34;
		
		int[] b0 = new int[3];
		b0[0] = a0;
		b0[1] = a1;
		b0[2] = a2;
		
		int[] b1 = new int[3];
		b1[0] = a0+1;
		b1[1] = a1+1;
		b1[2] = a2+1;
		
		// b0와 b1을 배열로 만들기
		int[][] c0 = new int[2][3]; // 2개 만들 거야, 각각 3개짜리 배열을
//		int[][] c0 = new int[2][]; // 3보다 작거나, 비워놔도 문제 없음!
		
		/* 아래의 경우 null 배열
		 * int[][] c0 = new int[2][];
		 */
		
		c0[0] = b0; // int배열로 이루어진 배열이므로, c0[0]의 타입은 int배열
		// 따라서 int배열인 b0가 들어가야 함
		c0[1] = b1;
		
		System.out.println("c0[0][0] : " + c0[0][0]); // 5 = a0 // 5?
		System.out.println("c0[1][0] : " + c0[1][0]); // 6 = a0+1 //6?
		
		System.out.println("c0.length : " + c0.length); // 2 : b0, b1
		System.out.println("c0[0].length : " + c0[0].length); // 3 : a0, a1, a2
		System.out.println("b1의 길이 : " + c0[1].length); // 3 : a0, a1, a2
		
		
//		String[] first = new String[] {"강정석", "김지윤", "홍세정"};
//		String[][] 천안 = new String[7][3]; // 반 7개, 한 반에 3명
//		String[][][] 휴먼 = new String[3][7][3]; // 휴먼센터 3개, 반 7개, 한 반에 3명
//		
//		천안[0] = first;
//		휴먼[0] = 천안;
//		
//		System.out.println("홍세정: " + 휴먼[0][1][2]); // 없는 거 null
//		
//		
//		int[][] c1 = { {1, 2, 3}, {4, 5, 6} }; // 이런식으로 직접 넣기 가능!
//		
//		int[][] c2 = { // 이런 식으로 실행블럭처럼 작성하기도 함
//				{1, 2, 3}, // 첫번째 배열은 3개
//				{4, 5, 6, 7}, // 두번째 배열은 4개 이런 식으로 가능!
//				null // null 넣기 가능!
//		};
		
		
		// 가장 바깥 차원은 꼭!!! 크기가 지정되어야 함
		int[][][][] arr = new int[2][][][]; // 제일 바깥 차원 1개만 있으면 됨
		// heap에 공간을 만들어야 하기 때문에
		// 모두 null로 초기화 된 상태
		// 참조 공간만 만들고, 실제 배열은 나중에 만드는 것
		// 가변배열(비정형배열) 이라고 함
		// 공간을 지정하지 않으면, 연속으로 적지 않기 때문에 고성능일 때 성능 차이가 있을 수 있음
			// 근데 우리가 느낄 만큼은 아니라 ㄱㅊ
		
		System.out.println(c0); // [[I@6c49835d : [[ - 2차원 배열 / I - int타입 / @~ - 주소
		System.out.println(c0[0]); // [I@5e853265 : [ - 1차원 배열 / I - int타입 / @~ - 주소
		System.out.println(c0[0][0]); // 5
		
		System.out.println("--------------------------");
		
		
		// 깊은 복사, 얕은 복사
		int k1 = 10;
		int k2 = k1;
		System.out.println(k2); // 10
		
		k1=5;
		System.out.println(k2); // 10 : 5로 바뀌지 않음. int기 때문에
	
		
		int[] d1 = {1, 2, 3};
		int[] d2 = d1;
		
		System.out.println(d2[0]); // 1
		
		d1[0] = 4;
		System.out.println(d2[0]); // 4 : 4로 바뀜
		// 아마 주소를 참조하기 때문 아닐까?
		
		/* 얕은 복사 (call by reference : 참조에 의한 호출, 주소값만 복사해옴)
		 * 
		 * = : stack의 값(또는 주소) 복사
		 * 
		 * 위와 같은 경우로, 주소를 복사해오기 때문에
		 * 값을 변경하는 경우, 원본도 바뀜.
		 * 그리고 당연히 해당 heap의 값이 변하기 때문에, 복사해온 값에도 영향 미침
		 */
		
		// 구글 독스 생각
		// 구글 독스는 주소를 공유하고, 그 공유에 접속해서 값을 바꾸면 어디에서 그 주소에 들어가든 다 바뀜
		
		System.out.println(d1[1]); // 2
		d2[1] = 5;
		System.out.println(d1[1]); // 5 : 주소 공유하기 때문에 바뀜!
		
		
		
		
		/* 깊은 복사 (call by value : 값에 의한 호출, 값을 복사해오는 것)
		 * 이전에 것을 변경해도, 복사해온 값에는 영향 안 미침
		 */
		
		// 인터넷에 올린 파일을 다운로드 해서 사용하는 것
		// 내가 다운받은 파일을 수정한다고 해서 원본 파일이 달라지진 않음
		// 파일을 다운로드 받아서 내 파일을 새로 만든 것!
		
		int[] d3 = new int[d1.length];
		for (int i=0; i<d3.length; i++) {
			d3[i] = d1[i];
		}
		System.out.println(d3[2]); // 3
		d1[2] = 100;
		System.out.println(d3[2]); // 3
		
		// stack 값을 비교하기 때문
		System.out.println(d1 == d2); // true
		System.out.println(d1 == d3); // false
		
		
		
		System.out.println("--------------------------");
		System.out.println();

		/* 깜짝 퀴즈
		 * 반복문 활용
		 * 1부터 5까지 11부터 15까지, 101부터 105까지
		 * 를 저장하는 2차원 배열을 만드시오
		 * 
		 * 그리고 다른 반복문으로 모두 출력
		 */
		
		int[] array1 = new int[5];
		int[] array2 = new int[5];
		int[] array3 = new int[5];
		
		for (int i=0; i<array1.length; i++) {
			array1[i] = 1+i;
			array2[i] = 11+i;
			array3[i] = 101+i;
		}

		int[][] array = {
				array1,
				array2,
				array3
		};
		
//		int[][] array = new int[3][5];
//		for (int i=0; i<array.length; i++) {
//			for (int j=0; j<array[i].length; j++) {
//				if (i==0) {
//					array[i][j] = 1+j;
//				} else if (i==1) {
//					array[i][j] = 11+j;
//				} else {
//					array[i][j] = 101+j;
//				} // if end
//			} // j end
//		} // i end
		
		
		for (int i=0; i<array.length; i++) {
			for (int j=0; j<array[i].length; j++) {
				System.out.print(array[i][j] + " ");
			} // j end
			System.out.println();
		} // i end
		
		
		System.out.println("--------------");
		
		
		/*정수형 3차원 배열 int[][][] arr = new int[2][3][4]; 를 선언한다.
			모든 요소에 1부터 시작하는 연속된 정수를 앞에서부터 차례대로 저장한 뒤,
			배열에 저장된 모든 값을 한 줄에 하나씩 출력하시오.
		 */
		
		int[][][] extra = new int[2][3][4];
		int value=1;
		
		for (int i=0; i<extra.length; i++) {
			for (int j=0; j<extra[i].length; j++) {
				for (int k=0; k<extra[i][j].length; k++) {
					extra[i][j][k] = value;
					value++;
				} // k end
			} // j end
		} // i end
		
		
		for (int i=0; i<extra.length; i++) {
			for (int j=0; j<extra[i].length; j++) {
				for (int k=0; k<extra[i][j].length; k++) {
					
					System.out.print(extra[i][j][k]);
					
				} // k end
				System.out.println();
			} // j end
		} // i end
		
		
		/* 정수형 3차원 배열 int[][][] arr = new int[3][3][3]; 를 선언한다.
			각 요소에 저장할 값은 해당 요소의 인덱스 (i, j, k)를 이용해 계산된 값이어야 한다.
			배열을 초기화한 뒤,
			각 2차원 면(첫 번째 인덱스 기준)의 합을 각각 출력하시오.
		 */
		
		int [][][] extra2 = new int[3][3][3];
		
		for (int i=0; i<extra2.length; i++) {
			for (int j=0; j<extra2[i].length; j++) {
				for (int k=0; k<extra2[i][j].length; k++) {
					extra2[i][j][k] = value;
					value++;
				} // k end
			} // j end
		} // i end
		
		for (int i=0; i<extra2.length; i++) {
			int sum = 0;
			for (int j=0; j<extra2[i].length; j++) {
				for (int k=0; k<extra2[i][j].length; k++) {
					
					sum += extra2[i][j][k];
					
				} // k end
			} // j end
			System.out.println(sum);
		} // i end
		
		System.out.println("--------------");
		
		
		int [][][] extra3 = new int[4][4][4];
		
		for (int i=0; i<extra3.length; i++) {
			for (int j=0; j<extra3[i].length; j++) {
				for (int k=0; k<extra3[i][j].length; k++) {
					extra3[i][j][k] = value;
					value++;
				} // k end
			} // j end
		} // i end
		
		int sum = 0;
		for (int i=0; i<extra3.length; i++) {
			for (int j=0; j<extra3[i].length; j++) {
				for (int k=0; k<extra3[i][j].length; k++) {
					if (i%2==0 && j%2!=0 && k>j && extra3[i][j][k] >= 10 && extra3[i][j][k] <= 60) {
						sum += extra3[i][j][k];
						System.out.printf("extra3[%d][%d][%d]: %d", i, j, k, extra3[i][j][k]);
						System.out.println();
					}
				} // k end
			} // j end
		} // i end
		System.out.println(sum);
		
		
		System.out.println("--------------");
		
		int extra4[][][] = new int [3][4][5];
		value = 1;
		for (int i = 0; i<extra4.length; i++) {
			for (int j = 0; j<extra4[i].length; j++) {
				for (int k = 0; k<extra4[i][j].length; k++) {
					extra4[i][j][k] = value++;
				} // k end
			} // j end
		} // i
		
//		for (int i = 0; i<extra4.length; i++) {
//			int max = -9999;
//			for (int j = 0; j<extra4[i].length; j++) {
//				for (int k = 0; k<extra4[i][j].length; k++) {
//					if (max<extra4[i][j][k]) {
//						max = extra4[i][j][k];
//					}
//
//				} // k end
//			} // j end
//			System.out.println(i + "면의 최댓값: " + max);
//		} // i
		
		for (int i=extra4.length-1 ; i>=0 ; i--) {
			int max = -9999;
			int min = 99999;
			sum = 0;
			for (int j=extra4[i].length-1 ; j>=0 ; j--) {
				for (int k=extra4[i][j].length-1 ; k>=0 ; k--) {
					if (max<extra4[i][j][k]) {
						max = extra4[i][j][k];
					}
					if (min>extra4[i][j][k]) {
						min = extra4[i][j][k];
					}
					sum += extra4[i][j][k];
				} // k end
			} // j end
			System.out.println(extra4.length-1-i + "면의 최댓값: " + max);
			System.out.println(extra4.length-1-i + "면의 최솟값: " + min);
			System.out.println(extra4.length-1-i + "면의 합계: " + sum);
		} // i
		
		System.out.println();
		System.out.println("---------------------------------");
		System.out.println();
		
		
		// 주제: 아파트 층별 세대 구조

		// 아파트 동의 구조가 층마다 다를 수 있습니다.
		// 아래 조건에 맞는 3차원 배열을 만드세요.

		// 총 2개의 동(buildings)이 있습니다.

		// 1동은 3층까지 있고, 2동은 2층까지 있습니다.
		// (층마다 호실 수는 자유롭게 설정하세요 - 가변 배열 활용)

		// 각 호실에는 거주 인원수(정수)를 저장합니다.
		// 조건: for-each문(향상된 for문)을 사용하여
		// 모든 호실의 인원수를 출력하고,
		// 전체 아파트에 살고 있는 총 인원수를 계산해 출력하세요.
		
//		int[][][] apart = new int[2][][];
//		int[][] first = new int[3][];
//		int[][] second = new int[2][];
		
//		int[] first_1 = {2, 3, 4, 5};
//		int[] first_2 = {2, 3, 4};
//		int[] first_3 = {4, 5};
//		
//		int[] second_1 = {1, 3, 4};
//		int[] second_2 = {1, 5, 4, 4, 3};
		
		
//		int[] first_1 = new int[4];
//		for (int i=0; i<first_1.length; i++) {
//			first_1[i] = (int)(Math.random()*6)+1;
//		}
//		
//		int[] first_2 = new int[3];
//		for (int i=0; i<first_2.length; i++) {
//			first_2[i] = (int)(Math.random()*6)+1;
//		}
//
//		int[] first_3 = new int[2];
//		for (int i=0; i<first_3.length; i++) {
//			first_3[i] = (int)(Math.random()*6)+1;
//		}
//		
//		int[] second_1 = new int[3];
//		for (int i=0; i<second_1.length; i++) {
//			second_1[i] = (int)(Math.random()*6)+1;
//		}
//
//		int[] second_2 = new int[5];
//		for (int i=0; i<second_2.length; i++) {
//			second_2[i] = (int)(Math.random()*6)+1;
//		}

		
		
//		int[] first_1 = new int[(int)((Math.random()*6)+1)];
//		int[] first_2 = new int[(int)((Math.random()*6)+1)];
//		int[] first_3 = new int[(int)((Math.random()*6)+1)];
//		int[] second_1 = new int[(int)((Math.random()*6)+1)];
//		int[] second_2 = new int[(int)((Math.random()*6)+1)];
		
		
//		int[][][] apart = new int [2][][];
		
		
		int[][] first = new int[3][];
		int[][] second = new int[2][];
		int[][][] apart = {
				first,
				second
		};

		for (int i=0; i<apart.length; i++) {
			for (int j=0; j<apart[i].length; j++) {
				apart[i][j] = new int[(int)((Math.random()*6)+1)];
			}
		}
		
		for (int i=0; i<apart.length; i++) {
			for (int j=0; j<apart[i].length; j++) {
				for (int k=0; k<apart[i][j].length; k++) {
					apart[i][j][k]=(int)((Math.random()*6)+1);
				} // k end
			} // j end
		} // i end
		
		sum=0;
		for (int i=0; i<apart.length; i++) {
			for (int j=0; j<apart[i].length; j++) {
				for (int k=0; k<apart[i][j].length; k++) {
					sum += apart[i][j][k];
					System.out.printf("%d동 %d층 %d호: %d명", i+1, j+1, k+1, apart[i][j][k]);
					System.out.println();
				} // k end
				System.out.println();
			} // j end
			System.out.println();
		} // i end
		System.out.println();
		System.out.println("아파트 총 인원: " + sum);
		
		System.out.println();
		
		 
//		[1] 데이터 구조 및 초기화
//		원본 데이터: int[2][12][5] (2개 생산 라인, 12개월, 5개 공정)
//		값 채우기: 1부터 1씩 증가하는 정수로 120개 방을 모두 채움
//		가공 저장소: int[2][12] 크기의 'riskMap' 배열을 새로 생성
//		*
//		[2] 미션 1: 데이터 가공 (평균값 산출)
//		원본 3차원 배열을 순회하며, 각 라인의 월별 5개 공정 값들의 '평균'을 구함
//		구한 평균값을 riskMap[라인][월] 위치에 각각 저장함 (소수점 버림)
//		*
//		[3] 미션 2: 패턴 분석 및 최종 필터링
//		가공된 'riskMap' 배열만 사용하여 다음 조건을 만족하는 값만 추출:
//		① 라인: 1번 라인만 검사 대상 (0번 제외)
//		② 계절 패턴: 인덱스 번호가 홀수인 달 (2, 4, 6, 8, 10, 12월에 해당)
//		③ 위험 감지: riskMap에 저장된 평균값이 90 이상인 경우*
//		[4] 최종 출력값
//		위 조건을 모두 만족하는 평균값들의 '합계'와 '개수'를 출력
		
		
		int[][][] factory = new int[2][12][5];
		int[][] riskMap = new int[2][12];
		
		value = 1;
		for (int i=0; i<factory.length; i++) {
			for (int j=0; j<factory[i].length; j++) {
				for (int k=0; k<factory[i][j].length; k++) {
					factory[i][j][k] = value++;
				}
			}
		}
		
		
		
		int avg = 0;
		for (int i=0; i<factory.length; i++) {
			for (int j=0; j<factory[i].length; j++) {
				
				sum = 0;
				avg = 0;
				
				for (int k=0; k<factory[i][j].length; k++) {
					sum += factory[i][j][k];
				} // k end
				
				avg = sum/factory[i][j].length;
				
				for (int l=0; l<riskMap.length; l++) {
					for (int m=0; m<riskMap[l].length; m++) {
						riskMap[l][m] = avg;
					} // m end
				} // l end
				System.out.println(avg);
				
			} // j end
		} // i end
		
		
		sum = 0;
		int count = 0;
		for (int i=1; i<riskMap[1].length; i+=2) {
			if (riskMap[1][i] >= 90) {
				System.out.println(i + "월 위험감지: " + riskMap[1][i]);
				sum += riskMap[1][i];
				count++;
			}
		}
		System.out.println();
		System.out.println("평균값의 합: " + sum);
		System.out.println("평균값의 개수: " + count);
		
		
		
		int[][] array5 = {
				{95, 86},
				{83, 92, 96},
				{78, 83, 93, 87, 88}
		};
		
		
		System.out.println();
		
		sum = 0;
		double average = 0;
		count = 0;
		
		for (int i=0; i<array5.length; i++) {
			for (int j=0; j<array5[i].length; j++) {
				sum += array5[i][j];
				count++;
			}
		}
		average = (double)sum/count;
		System.out.println("sum: " + sum);
		System.out.println("average: " + average);
		
		
		
	} // end
} // end
