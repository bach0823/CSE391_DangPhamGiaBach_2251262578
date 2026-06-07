## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

1. Thứ tự output:
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

2. Giải thích cơ chế:

- Call Stack: Chạy các lệnh đồng bộ trực tiếp (in ra 1 và 4 trước).
- Microtask Queue: Chứa các callback của Promise (in ra 3 và 6). Trình duyệt luôn ưu tiên chạy hết Microtask Queue trước khi chuyển qua Macrotask.
- Macrotask Queue: Chứa callback của setTimeout (in ra 2, 7 và 5). Chỉ được chạy khi Microtask Queue đã trống.
- Event Loop: Bộ điều phối, kiểm tra nếu Call Stack trống thì lôi tác vụ trong Microtask ra chạy trước, sau đó mới chạy từng tác vụ trong Macrotask.
