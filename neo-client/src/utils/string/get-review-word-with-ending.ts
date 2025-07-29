export const getReviewWordEnding = (reviewCount: number) => {
    if (reviewCount === 1) {
      return `${reviewCount} review`
    }
    return `${reviewCount} reviews`
  }
  