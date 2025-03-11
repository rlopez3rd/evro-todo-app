exports.paginate = async (model, query = {}, page = 1, perPage = 10) => {
  try {
    const offset = (page - 1) * perPage;
    const { count: total, rows: data } = await model.findAndCountAll({
      ...query,
      limit: perPage,
      offset: offset,
    });

    const totalPages = Math.ceil(total / perPage);
    const from = offset + 1;
    const to = Math.min(offset + perPage, total);

    return {
      data,
      meta: {
        from,
        to,
        total,
        page: Number(page),
        perPage: Number(page),
        totalPages,
      },
    };
  } catch (err) {
    console.log(err?.message);
  }
};

exports.infinitePaginate = async (model, query, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count: totalItems, rows: data } = await model.findAndCountAll({
    ...query,
    limit,
    offset,
    order: [["id", "ASC"]],
  });

  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = page < totalPages;

  return {
    data,
    meta: {
      currentPage: parseInt(page),
      totalPages,
      hasMore,
      totalItems,
    },
  };
};
