def find_ww_sum(arr, sum):
    best_difference = float('inf')
    best_triplet = []

    for i in range(len(arr) - 2):
        j = i + 1
        k = len(arr) - 1

        while k >= j:
            triplet_sum = arr[i] + arr[j] + arr[k]

            # Exact match!
            if triplet_sum == sum:
                return [arr[i], arr[j], arr[k]]

            if triplet_sum > sum:
                k -= 1
            else:
                # Hold onto the best guess
                if best_difference > (sum - triplet_sum):
                    best_difference = sum - triplet_sum
                    best_triplet = [arr[i], arr[j], arr[k]]

                j += 1

    return best_triplet


arr = [1, 2, 5, 10, 20, 50, 100]
print(find_ww_sum(arr, 109))
