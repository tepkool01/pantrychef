def find_best_triplet(arr, ww_sum):
    """
    This is our algorithmic component that determines the closest matching weight watcher meal prep based on
    WW points, percent match (ingredients in pantry) for a 3-course meal; we first provide it a sorted WW list
    :param arr: Array - possible matches, sorted
    :param ww_sum: Integer - requested weight watcher total daily points
    :return: Array
    """
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
            if triplet_sum == ww_sum:
                return [arr[i], arr[j], arr[k]]

            if triplet_sum > ww_sum:
                # Move pointer to the 'left' to close in on a lower WW score
                k -= 1
            else:
                # Hold onto the best guess
                if best_difference > (ww_sum - triplet_sum):
                    best_difference = ww_sum - triplet_sum
                    best_triplet = [arr[i], arr[j], arr[k]]

                # Move pointer to the 'right' to close in on a higher WW score
                j += 1

    return best_triplet
