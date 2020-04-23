def find_best_triplet(arr, sum):
    # Start out with the best difference being an arbitrarily high number (infinity), so it is easy to beat!
    best_difference = float('inf')

    # Holder for our return triplet in the event an exact match is not available
    best_triplet = []

    # Begin our loop, and create the first index pointer (i)
    for i in range(len(arr) - 2):
        # Initialize our other 2 pointers, which complete the triplet
        # one starting from the 2nd position
        # one starting from the end of the array
        j = i + 1
        k = len(arr) - 1

        while k >= j:
            # Grab the current WW sum of 3 meals
            triplet_sum = arr[i] + arr[j] + arr[k]

            # Exact match! Exit and tell the user of the triplet
            if triplet_sum == sum:
                return [arr[i], arr[j], arr[k]]

            if triplet_sum > sum:
                # Move pointer to the 'left' to close in on a lower WW score
                k -= 1
            else:
                # Hold onto the best guess
                if best_difference > (sum - triplet_sum):
                    best_difference = sum - triplet_sum
                    best_triplet = [arr[i], arr[j], arr[k]]

                # Move pointer to the 'right' to close in on a higher WW score
                j += 1

    return best_triplet


arr = [1, 2, 5, 10, 20, 50, 100]
print(find_ww_sum(arr, 109))
