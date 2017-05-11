package com.cc.data.sort;

public class SortTest {

	static SortData data = new SortData();

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		data.r = new int[] { 0, 50, 10, 90, 30, 70, 40, 80, 60, 20 };
		data.length = 9;

		quickSort(data);
		data.printData();
	}

	static void swap(SortData data, int i, int j) {
		int temp = data.r[i];
		data.r[i] = data.r[j];
		data.r[j] = temp;
	}

	static void heapSort(SortData data) {
		int i;
		for (i = data.length / 2; i > 0; i--) {
			heapAdjust(data, i, data.length);
		}
		for (i = data.length; i > 1; i--) {
			swap(data, 1, i);
			heapAdjust(data, 1, i - 1);
		}
	}

	static void heapAdjust(SortData data, int s, int m) //
	{//
		int temp, j;// 3
		temp = data.r[s];// 4
		for (j = 2 * s; j <= m; j *= 2) {
			if (j < m && data.r[j] < data.r[j + 1])// 7
				++j;// 8
			if (temp >= data.r[j]) {// 9
				break;// 10
			}
			data.r[s] = data.r[j];// 11
			s = j;// 12
		}
		data.r[s] = temp;// 14
	}

	static void bubbleSort0(SortData data) {
		int i, j;
		for (i = 1; i < data.length; i++) {
			for (j = i + 1; j < data.length; j++) {
				if (data.r[i] > data.r[j]) {
					swap(data, i, j);
				}
			}
		}
	}

	static void bubbleSort1(SortData data) {
		int i, j;
		for (i = 1; i < data.length; i++) {
			for (j = data.length - 2; j >= i; j--) {
				if (data.r[j] > data.r[j + 1]) {
					swap(data, j, j + 1);
				}
			}
		}
	}

	static void bubbleSort2(SortData data) {
		int i, j;
		boolean flag = true;
		for (i = 1; i < data.length && flag; i++) {
			flag = false;
			for (j = data.length - 2; j >= i; j--) {

				if (data.r[j] > data.r[j + 1]) {

					swap(data, j, j + 1);
					flag = true;
				}
			}
		}
	}

	static void selectSort(SortData data) {
		int i, j, min;
		for (i = 1; i < data.length; i++) {
			min = i;
			for (j = i + 1; j < data.length; j++) {
				if (data.r[min] > data.r[j]) {
					min = j;
				}
			}
			if (i != min)
				swap(data, i, min);
		}
	}

	static void insertSort(SortData data) {
		int i, j;
		for (i = 2; i < data.length; i++) {
			if (data.r[i] < data.r[i - 1]) {
				data.r[0] = data.r[i];
				for (j = i - 1; data.r[j] > data.r[0]; j--) {
					data.r[j + 1] = data.r[j];
				}
				data.r[j + 1] = data.r[0];
			}
		}
	}

	static void shellSort(SortData data) {
		int i, j;
		int increment = data.length;
		do {
			increment = increment / 3 + 1;
			for (i = increment + 1; i < data.length; i++) {
				if (data.r[i] < data.r[i - increment]) {
					data.r[0] = data.r[i];
					for (j = i - increment; j > 0 && data.r[0] < data.r[j]; j -= increment) {
						data.r[j + increment] = data.r[j];

					}
					data.r[j + increment] = data.r[0];
				}
			}
		} while (increment > 1);

	}

	static void mergeSort(SortData data) {
		msort(data.r, data.r, 1, data.length);
	}

	static void msort(int SR[], int TR1[], int s, int t) {
		int m;
		int[] TR2 = new int[data.length + 1];
		if (s == t) {
			TR1[s] = SR[s];
		} else {
			m = (s + t) / 2;
			msort(SR, TR2, s, m);
			msort(SR, TR2, m + 1, t);
			merge(TR2, TR1, s, m, t);
		}

	}

	static void merge(int SR[], int TR[], int i, int m, int n) {// i=1,m=8,n=9
		int j, k, l;
		for (j = m + 1, k = i; i <= m && j <= n; k++) {

			if (SR[i] < SR[j]) {
				TR[k] = SR[i++];
			} else {

				TR[k] = SR[j++];

			}
		}

		if (i <= m) {
			for (l = 0; l <= m - i; l++) {
				TR[k + l] = SR[i + l];
			}
		}

		if (j <= n) {
			for (l = 0; l <= n - j; l++) {
				TR[k + l] = SR[j + l];
			}
		}
	}

	static void mergeSort2(SortData data) {
		int[] TR = new int[data.length + 1];
		int k = 1;
		while (k < data.length) {
			mergePass(data.r, TR, k, data.length);
			k = 2 * k;
			mergePass(TR, data.r, k, data.length);
			k = 2 * k;

		}

	}

	static void mergePass(int SR[], int TR[], int s, int n) {
		int i = 1;
		int j;
		while (i <= n - 2 * s + 1) {
			merge(SR, TR, i, i + s - 1, i + 2 * s - 1);
			i = i + 2 * s;
		}

		if (i < n - s + 1) {
			merge(SR, TR, i, i + s - 1, n);
		} else {
			for (j = i; j <= n; j++) {
				System.out.println(TR[j]);
				TR[j] = SR[j];
			}
		}
	}

	static void print(int arr[]) {
		String string = "";
		for (int i = 0; i < arr.length; i++) {
			string += arr[i] + ",";
		}
		System.out.println("str:" + string);
	}

	static int partition(SortData data, int low, int high) {
		int pivotkey;
		pivotkey = data.r[low];
		data.r[0] = pivotkey;

		while (low < high) {
			while (low < high && data.r[high] >= pivotkey)
				high--;
			// swap(data, low, high);
			data.r[low] = data.r[high];
			while (low < high && data.r[low] <= pivotkey)
				low++;

			// swap(data, low, high);
			data.r[high] = data.r[low];

		}
		data.r[low] = data.r[0];
		return low;
	}

	static void qSort(SortData data, int low, int high) {
		int pivot;
		// if (low < high) {
		// pivot = partition(data, low, high);
		// qSort(data, low, pivot - 1);
		// qSort(data, pivot + 1, high);
		// }
		while (low < high) {
			pivot = partition(data, low, high);
			qSort(data, low, pivot - 1);
			low = pivot + 1;
		}
	}

	static void quickSort(SortData data) {
		qSort(data, 1, data.length);
	}
}
