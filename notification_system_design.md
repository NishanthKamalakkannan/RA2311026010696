# Stage 1

## Priority Inbox Approach

Priority is determined by two factors:
1. **Weight** — Placement (3) > Result (2) > Event (1)
2. **Recency** — More recent notifications rank higher within the same weight

## Scoring Formula
score = type_weight * 10^13 + unix_timestamp_ms

Higher weight notifications always rank above lower weight ones.
Within the same type, more recent notifications rank higher.

## Maintaining Top N Efficiently
A Min-Heap of size N is used. As new notifications arrive, compare
the incoming notification's score with the minimum element in the heap.
If the new score is higher, replace the minimum with the new notification
and re-heapify. This keeps:
- Space complexity: O(N)
- Insert complexity: O(log N)

This ensures efficient handling as notifications keep streaming in,
without needing to re-sort the entire list each time.
