import Blog from '@/component/blog'

export default function BlogPage() {
    return (
      <div className="flex flex-col flex-1 w-full min-h-screen"> {/* Changed h-full to min-h-screen */}
        <Blog />
      </div>
    );
}
  