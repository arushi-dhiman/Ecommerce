using Microsoft.EntityFrameworkCore;

namespace EcommerceApplication.Paginate
{
    public class Pagination<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; set; }
        public int PageCount { get; private set; }
        public int PageSize { get; private set; }
        public Pagination()
        {
            
        }
        public Pagination(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            AddRange(items);

        }
        public bool PreviousPage => (PageIndex > 1);


        public bool NextPage => (PageIndex < TotalPages);

        public static  Pagination<T> ToPageList(IEnumerable<T> source, int pageIndex, int pageSize)
        {
            var count =  source.Count();
            var items =  source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new Pagination<T>(items, count, pageIndex, pageSize);
        }


    }
}
