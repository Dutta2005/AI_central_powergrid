'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockKnowledgeBase } from '@/lib/mock-data';
import { Search, BookOpen, ThumbsUp, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof mockKnowledgeBase[0] | null>(null);

  const filteredArticles = mockKnowledgeBase.filter(
    (article) =>
      search === '' ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      article.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Knowledge Base</h1>
          <p className="text-slate-600 mt-1">Search for helpful articles and guides</p>
        </div>

        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search articles by title, tags, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No articles found matching your search</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <BookOpen className="w-5 h-5 text-[#004b87] mt-1" />
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {article.helpful_count}
                      </span>
                    </div>
                    <span>{format(new Date(article.updated_at), 'MMM dd')}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                      <DialogDescription className="mt-2">
                        {selectedArticle.summary}
                      </DialogDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {selectedArticle.category}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </DialogHeader>
                <div className="mt-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {selectedArticle.content}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div>
                        <p>
                          <span className="font-medium">Author:</span> {selectedArticle.author_name}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Last updated:</span>{' '}
                          {format(new Date(selectedArticle.updated_at), 'MMMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {selectedArticle.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {selectedArticle.helpful_count} helpful
                        </span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm font-medium text-slate-900 mb-3">Was this article helpful?</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ThumbsUp className="w-4 h-4" />
                          Yes
                        </Button>
                        <Button variant="outline" size="sm">
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
