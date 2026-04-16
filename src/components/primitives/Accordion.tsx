'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

interface AccordionRowProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function AccordionRow({ item, isOpen, onToggle }: AccordionRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const contentId = `accordion-content-${item.id}`;
  const triggerId = `accordion-trigger-${item.id}`;

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    setHeight(contentRef.current.scrollHeight);
  }, [item.content, isOpen]);

  return (
    <div>
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => onToggle(item.id)}
        className="flex w-full items-center justify-between gap-4 px-0 py-4 text-left text-base font-medium text-[var(--color-ink)] transition-colors duration-200 ease-out hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
      >
        <span>{item.title}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 text-[var(--color-muted)] transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden transition-[max-height] duration-200 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div
          ref={contentRef}
          className="pb-4 text-sm leading-relaxed text-[var(--color-muted)]"
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}

function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggleItem = (id: string) => {
    setOpenIds((currentOpenIds) => {
      const isCurrentlyOpen = currentOpenIds.includes(id);

      if (allowMultiple) {
        return isCurrentlyOpen
          ? currentOpenIds.filter((openId) => openId !== id)
          : [...currentOpenIds, id];
      }

      return isCurrentlyOpen ? [] : [id];
    });
  };

  return (
    <div className={`divide-y divide-[var(--color-border)] ${className}`}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={toggleItem}
        />
      ))}
    </div>
  );
}

export default Accordion;
export type { AccordionItem, AccordionProps };
