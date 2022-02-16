class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.name ? {
            name: {
                $regex: this.queryStr.name,
                $options: 'i' // i means case insensitive
            }
        } : this.queryStr.category ? {
            category: {
                $regex: this.queryStr.category,
                $options: 'i' // i means case insensitive
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing fields from the query string
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el])

        // Advanced filter not yet applied

        this.query = this.query.find(queryCopy)
        return this
    }
    
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = APIFeatures